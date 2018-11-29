import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";


@Injectable()
export class AdmminService {

    constructor(private http: HttpClient) { }

    public sendEmails() {
        this.http.get("http://localhost:4241/email").subscribe(res => {
            debugger;
            window.alert(res);
        });
    }

}
