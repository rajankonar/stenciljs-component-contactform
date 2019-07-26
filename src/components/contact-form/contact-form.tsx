import { Component, State, h } from '@stencil/core';
import * as smtp from './../../assets/smtp.js'

@Component({
  tag: 'contact-form',
  styleUrl: 'contact-form.scss',
  shadow: true
})
export class ContactForm {
  @State() value: string;
  @State() nameValue: string;
  @State() departmentValue: string;
  @State() lastNameValue: string;
  @State() cityValue: string;
  @State() professionValue: string;
  @State() phoneValue: string;
  @State() emailValue: string;
  @State() msgValue: string;
  @State() selectValue: string;
  @State() secondSelectValue: string;
  @State() avOptions: any[];

  handleSelectDepartment(event) {
    this.departmentValue = event.target.value;
  }
  handleSelectCity(event) {
    this.cityValue = event.target.value;
  }
  handleSelectProfession(event) {
    this.professionValue = event.target.value;
  }
  handleInputName(event) {
    this.nameValue = event.target.value;
  }  
  handleInputLastName(event) {
    this.lastNameValue = event.target.value;
  }
  handleInputPhone(event) {
    this.phoneValue = event.target.value;
  }
  handleInputEmail(event) {
    this.emailValue = event.target.value;
    if (event.target.validity.typeMismatch) {
      console.log('this email element is not valid')
    }
  }
  handleInputMsg(event) {
    this.msgValue = event.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    var sendEmail = this.emailValue;
    const input = {
      name: this.nameValue,
      department: this.departmentValue,
      lastname: this.lastNameValue,
      city: this.cityValue,
      profession: this.professionValue,
      phone: this.phoneValue,
      email: this.emailValue,
      msg: this.msgValue,
    }

    fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(input)
      }).then(response => response.json())
      .then(data => {
        console.log('Request success: ', data);
        /* reset data */
        this.resetInput();
        if (data.id != '') {
          //alert(data);
          smtp.Email.send({
            SecureToken: "************************************",
            To: sendEmail,
            From: "your registered email id in smtp",
            Subject: "test contact",
            Body: "Testing contact form"
          }).then(
            message => (message === 'OK' ? alert('Email status : Sent') : alert('Email status : Failed'))
          );
        }
      })
      .catch(function (error) {
        console.log('Request failure: ', error);
      });
  }

  handleChange(event) {
    this.value = event.target.value;
    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }
 /* reset data */
  resetInput() {
    this.nameValue ="",
    this.departmentValue ="",
    this.lastNameValue ="", 
    this.cityValue ="",
    this.professionValue ="",
    this.phoneValue ="",
    this.emailValue ="",
    this.msgValue="";
  }

  render() {
    return (
      <form id="contact-form" onSubmit={(e) => this.handleSubmit(e)}>
        <div class="block-input">
          <label>
            Department: 
          </label>
            <select onInput={(event) => this.handleSelectDepartment(event)}>
            <option value="Choose" selected={this.departmentValue === 'Choose'}>- Choose -</option>
            <option value="IT" selected={this.departmentValue === 'IT'}>IT</option>
            <option value="Production" selected={this.departmentValue === 'Production'}>Production</option>
            <option value="Medical" selected={this.departmentValue === 'Medical'}>Medical</option>
            <option value="Support" selected={this.departmentValue === 'Support'}>Support</option>
          </select>
        </div>
        <div class="block-input">
          <label>
            Your name:
          </label>
          <input type="text" value={this.nameValue}  onInput={(e) => this.handleInputName(e)} />
        </div>
        <div class="block-input">
          <label>
            Last name:
          </label>
          <input type="text" value={this.lastNameValue}  onInput={(e) => this.handleInputLastName(e)} />
        </div>
        <div class="block-input">
          <label>
            City:
          </label>
          <select onInput={(event) => this.handleSelectCity(event)}>
            <option value="Choose" selected={this.cityValue === 'Choose'}>- Choose -</option>
            <option value="Mumbai" selected={this.cityValue === 'Mumbai'}>Mumbai</option>
            <option value="Pune" selected={this.cityValue === 'Pune'}>Pune</option>
            <option value="Chennai" selected={this.cityValue === 'Chennai'}>Chennai</option>
            <option value="Delhi" selected={this.cityValue === 'Delhi'}>Delhi</option>
            <option value="Jaipur" selected={this.cityValue === 'Jaipur'}>Jaipur</option>
          </select>
        </div>
        <div class="block-input">
          <label>
            Your profession:
          </label>
          <select onInput={(event) => this.handleSelectProfession(event)}>
            <option value="Choose" selected={this.professionValue === 'Choose'}>- Choose -</option>
            <option value="Doctor" selected={this.professionValue === 'Doctor'}>Doctor</option>
            <option value="ITdeveloper" selected={this.professionValue === 'ITdeveloper'}>IT developer</option>
            <option value="Student" selected={this.professionValue === 'Student'}>Student</option>
            <option value="Other" selected={this.professionValue === 'Other'}>Other</option>
          </select>
        </div>
        <div class="block-input">
          <label>
            Phone:
          </label>
          <input type="number" value={this.phoneValue}  onInput={(e) => this.handleInputPhone(e)} />
        </div>
        <div class="block-input">
          <label>
            E-mail Address:
          </label>
          <input type="email" value={this.emailValue}  onInput={(e) => this.handleInputEmail(e)} />
        </div>
        <div class="block-input">
          <label>
            Your message - Please enter the message you want to send us 
          </label>
          <textarea value={this.msgValue} onInput={(e) => this.handleInputMsg(e)}></textarea>
        </div>
       <div class="block-input disclaimer-block">
        <label> 
          Disclaimer:
        </label>
        <label class="label-small">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </label>
        </div>
        <div class="block-input">
          <input type="checkbox" name="disclaimer" />  
          <label class="label-inline label-small">I have read it, There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. 
          </label>
        </div>
        <div class="block-input">
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}