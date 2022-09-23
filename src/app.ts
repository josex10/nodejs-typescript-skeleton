import express, {Application, Request, Response} from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import { RoleRoute } from './api/v1/routes'
import { MySqlConfig } from './api/v1/config'

class ServerApp {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3600';
        this.initialize();
        this.routes();
        this.listen();
        this.dbConnection();
    }

    initialize(){
        this.app = express();
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:true}));
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use('/api', new RoleRoute().getRouter())
        this.app.get('/api',(_req: Request, res:Response) => {
            return res.send("Welcome to the skeleton")
        })
    }

    async dbConnection(){
        try {
            const mysqlConfig = new MySqlConfig();
            const connection = await mysqlConfig.initialize();
            console.log("The connection to the DB is established");
            await mysqlConfig.close(connection);
        } catch (e) {
            console.error(e)
        }
        
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Welcome to the skeleton api, it's running on port ${this.port}`);
        })
    }

}

new ServerApp();