
export default class Row {
    
    //check response
    static async checkResponse(index: number, rowId: string, response: string, seed: number, userId: string): Promise<any> {
        try {
            return fetch(process.env.REACT_APP_API_DOMAIN + `/v1/responses`, {
                method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        index: index,
                        rowId: rowId,
                        response: response,
                        seed: seed,
                        userId: userId
                    })
            })
            .then(response => response.json());
        }
        catch {
            throw("error in check response");
        }
    }
}