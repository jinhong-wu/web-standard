import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.less']
})
export class PipeComponent implements OnInit {

  constructor() { }

	test = [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}]
  ngOnInit(): void {
  }

}
