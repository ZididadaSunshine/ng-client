import { Component, OnInit, Inject, Input, Optional } from '@angular/core';
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
  state: string;

  get name() { return this.brandForm.get('name'); }

  constructor(
    private brandService: BrandService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<BrandDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) 
    public brand: Brand,
    private translate: TranslatePipe,
    private capitalize: CapitalizePipe,
    private httperror: HttpErrorPipe) { }

  ngOnInit() {
    this.brandForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });


    if (this.brand == null) {
      this.brand = new Brand();
      this.state = 'create';
    } else {
      this.state = 'update';
      this.brandForm.setValue({ name: this.brand.name });
    }
  }

  onSubmit(): void {
    const state = this.state;
    if (state == 'create') {
      this.create();
    } else if (state == 'update') {
      this.update();
    }
  }

  create() {
    const brand = this.brand;
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
    );
  }

  update() {
    const brand = this.brand;
    brand.name = this.name.value;

    this.brandService.update(brand).subscribe(
      () => {
        this.dialogRef.close({ success: true });

        this.snackbar.open(
          this.capitalize.transform(
            this.translate.transform('Brand %s updated', [brand.name])
          )
        );
      },
      error => {
        this.snackbar.open(
          this.httperror.transform(error)
        );
      }
    );
  }

  onClose(): void {
    this.dialogRef.close({ success: false });
  }
}
