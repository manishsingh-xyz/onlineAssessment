import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  result;
  correctAnswer = 0;
  inCorrectAnswer = 0;
  notAnswered = 0;
  pieChartLabels:string[] = ['Javascript', 'HTML', 'Angular','CSS'];
  pieChartData:number[] = [];
  pieChartType:string = 'pie';
  javascriptAnswer = 0;
  htmlAnswer =0;
  cssAnswer = 0;
  angularAnswer = 0


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.result = this.dataService.getValue();    
    this.result.questions.forEach(element => {
      if (element.questionTypeId === 1) {
        this.javascriptAnswer = this.javascriptAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === true).length;   
      }  
      if (element.questionTypeId === 2) {
          this.htmlAnswer = this.htmlAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === true).length;
      }    
      if (element.questionTypeId === 3) {
          this.angularAnswer = this.angularAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === true).length;
      } 
      if (element.questionTypeId === 4) {
          this.cssAnswer = this.cssAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === true).length;  
      }  
      
      this.correctAnswer = this.correctAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === true).length;
      this.inCorrectAnswer = this.inCorrectAnswer + element.options.filter(x=> x.isAnswer === true && x.selected === false).length;
      this.notAnswered = this.notAnswered+ element.options.filter(x=> x.isAnswer === true && x.selected === undefined).length;
      
    });
    this.pieChartData.push(this.javascriptAnswer);
    this.pieChartData.push(this.htmlAnswer);
    this.pieChartData.push(this.angularAnswer);
    this.pieChartData.push(this.cssAnswer);
  }

  public chartClicked(e:any):void {
  //  console.log(e);
  }
 
  public chartHovered(e:any):void {
   // console.log(e);
  }

}
