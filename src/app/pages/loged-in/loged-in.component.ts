import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loged-in',
  templateUrl: './loged-in.component.html',
  styleUrls: ['./loged-in.component.css']
})
export class LogedInComponent implements OnInit {
  username: string='';
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.username=this.route.snapshot.queryParamMap.get("name")!
  }

}
