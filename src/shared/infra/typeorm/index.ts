import { Connection, createConnection, getConnectionOptions } from "typeorm";

// createConnection();
// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then((options) => {
//     const newOptions = options as IOptions;
//     newOptions.host = "database"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//     createConnection({
//         ...options,
//     });
// });

export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : host,
            // se meu process.env.NODE_ENV === "test"
            // então eu quero que vc use um banco de dados,
            // senão eu quero que vc use o que vem como default
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx_test"
                    : defaultOptions.database,
        })
    );
};
