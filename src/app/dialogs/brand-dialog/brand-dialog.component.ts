import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Brand } from '../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from '../../services';
import { TranslatePipe, CapitalizePipe } from '../../pipes';
import { HttpErrorPipe } from '../../pipes/http-error/http-error.pipe';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.css']
})
export class BrandDialogComponent implements OnInit {

  brandForm: FormGroup;

  get name() { return this.brandForm.get('name'); }

  constructor(private brandService: BrandService,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<BrandDialogComponent>,
              private translate: TranslatePipe,
              private capitalize: CapitalizePipe,
              private httperror: HttpErrorPipe) { }

  ngOnInit() {
    this.brandForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    const brand = new Brand()
    brand.name = this.name.value;

    this.brandService.create(brand).subscribe(
      () => {
        this.dialogRef.close({ success: true });
        
        this.snackbar.open(
          this.capitalize.transform(
            this.translate.transform('Brand %s created', [brand.name])
          )
        );
      },
      error => {
        this.snackbar.open(
          this.httperror.transform(error)
        );
      }
    )
  }

  onClose(): void {
    this.dialogRef.close({ success: false });
  }
}
