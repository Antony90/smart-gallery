import axios from "axios";
import { BaseAction } from "../models/Action";

export const checkOnline = async () => {
    return axios.get<{ status: boolean }>("/status").then(resp => resp.data && resp.data.status).catch(() => (true));
}

export const getActions = async (userID: string) => {
    return axios.get<{ actions: BaseAction[] }>("/actions", {
        params: { userID }
    }).then(resp => resp.data.actions);
}