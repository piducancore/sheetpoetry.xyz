const { google } = require("googleapis");
const { gql, ApolloServer } = require("apollo-server-micro");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const cors = require("micro-cors")(); // highlight-line

const getColumns = async (spreadsheetId, range) => {
  try {
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
  } catch (error) {
    throw error;
  }
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
  introspection: true,
});

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({ path: "/api" });
  return cors((req, res) => (req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res)));
});

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
