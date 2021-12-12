import { google } from "googleapis";
import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const getColumns = async (spreadsheetId, range) => {
  const auth = await google.auth.getClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n").trim(),
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });
  const { spreadsheets } = google.sheets({ version: "v4", auth });
  const { data } = await spreadsheets.values.get({ spreadsheetId, range });
  const { values } = data;
  const columns = values[0].map((_, colIndex) => values.map((row) => row[colIndex]));
  return columns;
};

const sheetPoetry = async (spreadsheetId, range, repeat) => {
  const columns = await getColumns(spreadsheetId, range);
  const create = () => columns.map((column) => column[Math.floor(Math.random() * column.length)]).join(" ");
  const verses = [];
  for (let i = 0; i < repeat; i++) {
    verses.push(create());
  }
  console.log(verses.join("\n"), verses.length);
  return verses.join("\n");
};

const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`;

const resolvers = {
  Query: {
    sheetpoem: async (_, { spreadsheetId, range, verses }) => await sheetPoetry(spreadsheetId, range, verses || 1),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
