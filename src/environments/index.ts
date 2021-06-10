import * as dotenv from 'dotenv'

dotenv.config()

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'local'

//application
const PORT: number = +process.env.PORT || 14047

//jwt
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY

// typeorm
const environment = {
    local: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
	// development: {
    //     host: 'localhost',
	// 	port: MONGO_PORT!,
	// 	username: '',
	// 	password: '',
	// 	database: MONGO_DB!,
	// },
	// production: {
	// 	url: MLAB_URL
	// }
}
const TYPEORM = environment[NODE_ENV]

export {
    NODE_ENV,
    PORT,
    TYPEORM,
    JWT_SECRET_KEY as JWT_SECRET_JEY
}