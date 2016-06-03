

export class OrtAsyncValidator {
    
    
    public static validateAsync(ctrl): Promise<any> {
        
        return new Promise((resolve) => {
            // Async
            setTimeout(() => {
                
                // +--- Simuliert Web API
                // |
                // v
                if (ctrl.value == 'Graz' || ctrl.value == 'Hamburg') {
                    resolve({ });
                }
                else {
                    resolve({ ortAsync: true });
                }
            }, 3000);
            
            
        });
        
    }
    
    
}