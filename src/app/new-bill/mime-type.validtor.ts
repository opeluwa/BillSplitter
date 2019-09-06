import {AbstractControl} from '@angular/forms';
import {Observable, Observer} from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {       // dynamic property name
  const file = control.value as File;
  const fileReader = new FileReader();
    let frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);  // allows us to read pattern in files to understand mime type
        let header = '';
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {   /// GOING THROUGH THE PATTERN
          header += arr[i].toString(16);   // convert to hex
        }  // gives us a string for a partcular pattern.

        switch (header)  {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }

        isValid ? observer.next(null) : observer.next({invalid: true});  // if it returns null it succeeded else it failed
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);  // allows us to access the mine type
    });
  return frObs;
};
