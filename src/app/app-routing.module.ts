import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'answer', component: AnswersComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
