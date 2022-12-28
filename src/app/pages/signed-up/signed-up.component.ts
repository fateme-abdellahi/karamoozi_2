import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signed-up',
  templateUrl: './signed-up.component.html',
  styleUrls: ['./signed-up.component.css']
})
export class SignedUpComponent implements OnInit {
  name: string=''
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.name=this.route.snapshot.queryParamMap.get("name")!

  }

}
