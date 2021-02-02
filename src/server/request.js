import axios from "axios";
import { PORT } from "../utils/config";

const serverAxios = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export default serverAxios;
