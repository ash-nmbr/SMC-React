import http from "../http-common";


class SMCService {
    login(data){
        return http.post("/login", data);
    }

    addCompany(data) {
        return http.post("/company", data);
    }

    addExcel(data) {
        return http.post("/addStockPrice", data);
    }

    getAllCompanies() {
        return http.get("/getAllCompanies");
    }

    findByCompanyName(name) {
        return http.get(`/getCompany/${name}`);
    }

    getCompanyByCode(code) {
        return http.get(`/getCompanyByCode/${code}`);
    }

    updateCompany(data) {
        return http.post("/updateCompany", data);
    }

    deleteCompany(data) {
        return http.post("/deleteCompany", data);
    }

    getAllExchanges() {
        return http.get("/getStockExchangesList");
    }

    findByExchangeName(data) {
        return http.get(`/getExchangeByName/${data}`);
    }

    addNewExchange(data) {
        return http.post("/addStockExchange", data);
    }

    updateExchange(data) {
        return http.post("/updateExchange", data);
    }

    getAllIpos() {
        return http.get("/getAllIPO");
    }

    getCompanyIPODetails(data) {
        return http.get(`/getCompanyIPODetails/${data}`);

    }

    addOrUpdateIpo(data) {
        return http.post("/addOrUpdateIPO", data);
    }

    getAllSectors() {
        return http.get("/getAllSectors");
    }

    addNewSector(data) {
        return http.post("/addSector", data);
    }

    findSectorByName(data) {
        return http.get(`/getSectorByName/${data}`);
    }

    updateSector(data) {
        return http.post("/updateSector", data);
    }

    getCompanyStockDetails(data) {
        return http.post("/getCompanyStockPrice", data);
    }

    getSectorStockDetails(data) {
        return http.post("/getSectorStockPrice", data);
    }

    getUserByEmail(email) {
        return http.get(`/getUserByEmail/${email}`);

    }

    getCompaniesOfSector(data) {
        return http.get(`/getCompaniesOfSector/${data}`);

    }

    updateUser(data) {
        return http.post("/updateUser", data);
    }

    signUp(data) {
        return http.post("/setuserapi", data);
    }

    getCompaniesInExchange(data) {
        return http.get(`/getCompaniesInExchange/${data}`);
    }


}

export default new SMCService();