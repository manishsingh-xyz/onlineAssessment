import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[];
  assestment;
  enableSubmit = false;
  enableNext = false;
  allDone = false;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.questions = this.dataService.getAll();
    this.assestment = this.questions[0].id;
    this.getAssessment(this.assestment);
  }

  getAssessment(name: string) {
    this.dataService.get(name).subscribe( (res:any) => {
     this.assestment = res;
     this.assestment.questions = res.questions
                                    .map((a) => ({sort: Math.random(), value: a}))
                                    .sort((a, b) => a.sort - b.sort)
                                    .map((a) => a.value)
     this.pager.count = this.assestment.questions.length;
    });
  }

  get filteredQuestions() {
    return (this.assestment.questions) ?
      this.assestment.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(event,question, option) {
    console.log(event);
    
    if(event.target.checked) {
      this.enableSubmit = true;
      this.enableNext = false;
    } else {
      this.enableSubmit = false;
      this.enableNext = false;
    }
    question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
  }

  saveAnswer() {
    this.enableNext = true;
    this.enableSubmit = false;
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.enableNext = false;
    } else {
      this.allDone = true;
    }
  }

  onSubmit() {
    let answers = [];
    this.assestment.questions.forEach(x => answers.push({ 'quizId': this.assestment.id, 'questionId': x.id, 'answered': x.answered }));
    this.dataService.setValue(this.assestment);
    this.router.navigate(['/answer']);
  }

}
