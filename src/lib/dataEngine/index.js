export default class {
    constructor(data){
        this.data = data || null;
        this.isLoading = false;
        this.hasData = Boolean(data);
        this.isError = false;
        this.error = null;

        this.requestMethod = () => {};
    }

    request = method => {

    }

}