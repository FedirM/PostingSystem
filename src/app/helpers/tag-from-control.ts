import { FormControl } from "@angular/forms";

export class TagFromControl extends FormControl {
    setValue(value: string, options: any) {
        if(!value) return super.setValue('', {...options, emitModelToViewChange: true});
        value = value.replace(/(\w)\s+(\w)/g, "$1, $2");
        super.setValue(value, {...options, emitModelToViewChange: true});
    }
}
