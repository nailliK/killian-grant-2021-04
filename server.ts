import express, {Express, Request, Response} from "express";
import * as http from "http";
import cors from "cors";
import mail from "@sendgrid/mail";
import bodyParser from "body-parser";
import * as path from "path";
import dotenv, {DotenvConfigOutput} from "dotenv";

const config: DotenvConfigOutput = dotenv.config();

mail.setApiKey(<string>config?.parsed?.SENDGRID_API_KEY);

const app: Express = express();

app.use(express.static(path.join(process.cwd(), "dist")));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(cors());

app.use((req: Request, res: Response, next) => {
	res.append("Access-Control-Allow-Origin", ["*"]);
	next();
});

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.join(process.cwd(), "dist") + "/index.html");
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(process.cwd(), "dist") + "/index.html");
});


const server = http.createServer(app);
server.listen(config?.parsed?.PORT);

console.log(`Server running on port ${config?.parsed?.PORT}`);
