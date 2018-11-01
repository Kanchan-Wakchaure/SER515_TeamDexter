import { Injectable } from "../../../node_modules/@angular/core";
import {
    HttpClient,
    HttpHeaders,
} from "../../../node_modules/@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

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
