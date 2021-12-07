import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TagFromControl } from '../helpers/tag-from-control';

import { Post } from '../interfaces/post';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private formBuilder: FormBuilder
  ){
    this.editForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      tags: new TagFromControl(this.data.tags.join(', '), [Validators.required]),
      text: [this.data.text, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let tmp = Object.assign(this.data, this.editForm.getRawValue());
    tmp.tags = tmp.tags.replace(/[\s,]+$/, '').split(', ');
    this.dialogRef.close({...tmp});
  }

}
