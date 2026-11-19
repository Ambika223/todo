import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../model/interface';
import { UuidService } from 'src/app/services/uuid.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo3',
  templateUrl: './todo3.component.html',
  styleUrls: ['./todo3.component.scss']
})
export class Todo3Component implements OnInit {
  UuidService: any;
  checked: any;

  constructor(private _uuidService: UuidService,
    private _snackBarService: SnackBarService
  ) { }
  @ViewChild('todoRef') todoInput!: ElementRef<HTMLInputElement>
  @ViewChild('statusRef') statusInput!: ElementRef<HTMLSelectElement>
  ngOnInit(): void {
  }


  todosArr: Array<Itodo> = [
    {
      id: "1",
      item: "Learn HTML",
      isCompleted: true
    },
    {
      id: "2",
      item: "Learn CSS",
      isCompleted: true
    },
    {
      id: "3",
      item: "Learn JavaScript",
      isCompleted: true
    },
    {
      id: "4",
      item: "Learn Angular",
      isCompleted: false
    }
  ]


  isEditMode: boolean = false;
  editId!: string


  private resetForm(): void {
    this.todoInput.nativeElement.value = '';
    this.statusInput.nativeElement.value = '';
  }


  //add

  AddTodo() {
    let todoobj: Itodo = {
      item: this.todoInput.nativeElement.value,
      isCompleted: this.statusInput.nativeElement.value === 'Yes',
      id: this._uuidService.getuuid()
    }
    // console.log(todoobj)
    this.todosArr.push(todoobj);
    this._snackBarService.snackBar(`The todoItem added Successfully`);
    this.resetForm()
  }

  //edit
  onEdit(todo: Itodo) {
    this.todoInput.nativeElement.value = todo.item;
    this.statusInput.nativeElement.value = todo.isCompleted ? 'Yes' : 'No';
    this.editId = todo.id;
    this.isEditMode = true
  }

  //update
  onUpdate() {
    const todo = this.todosArr.find(todo => todo.id === this.editId);
    // console.log(todo)
    if (todo) {
      todo.item = this.todoInput.nativeElement.value;
      todo.isCompleted = this.statusInput.nativeElement.value === 'Yes';
      this.resetForm();
      this.isEditMode = false;
      this._snackBarService.snackBar('Todo Updated Successfully')
    }
  }

  //remove
  onRemove(todo: Itodo) {
    let getConfirm = confirm(`Are You Sure You want to remove the Item having id ${todo.id}`);
    if (getConfirm) {
      let removeIndex = this.todosArr.findIndex(t => t.id === todo.id);
      this.todosArr.splice(removeIndex, 1);
      this._snackBarService.snackBar(`The todoItem is removed successfully`)
    }
  }


  //checkBox
  onChangeCheckBox(todo: Itodo) {
    todo.isCompleted = !todo.isCompleted;
  }

}
