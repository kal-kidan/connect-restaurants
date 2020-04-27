import {AbstractControl} from '@angular/forms';
export function imageValidator (control: AbstractControl) {
    
    let imageTypes=["GIF","JPG","PNG","SWF","PSD","BMP","JPC","SWC","JPX","JP2","IFF","WBMP","XBM","JPEG"];          
    if (control.get('password').pristine || control.get('confirmpassword').pristine) {
        return null;
     }
     else{
        let extension = control.get("file").value.split('.')[1];
        extension = extension.toUpperCase();
        if(imageTypes.includes(extension)){
            return {invalidImage: true};
        }
        else{
            return {invalidImage: false};
        }
     }
    
    
}