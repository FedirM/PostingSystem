import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'evaluate'
})
export class EvaluatePipe implements PipeTransform {

    transform( value: string ) {
        console.log('Pipe value: ', value);
        let matchRes = null;
        let tmp;
        while(matchRes = value.match(/(\d+)\s*(\+|-)\s*(\d+)/)) {
            console.log('While: ', tmp = value.match(/(\d+)\s*(\+|-)\s*(\d+)/));
            value = value.replace(/(\d+)\s*(\+|-)\s*(\d+)/, this.eval(matchRes[1], matchRes[2], matchRes[3]))
        };

        return value;
    }

    private eval(num1: string, operation: string, num2: string): string {
        if(operation === '+'){
            return (Number(num1) + Number(num2)).toString();
        } else {
            return (Number(num1) - Number(num2)).toString();
        }
    }
}