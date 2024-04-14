import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    isUpdate: boolean = false;
    formVideojuego: FormGroup = new FormGroup({});

    constructor(private service: ServicioVideoJuegoService) { }

    ngOnInit(): void {
        this.formVideojuego = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]), 
            nombre: new FormControl('', [Validators.required]),
            precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
            multijugador: new FormControl('', [Validators.required]),
            fechaLanzamiento: new FormControl('', [Validators.required])
        });
    }

    crearVideojuego() {
        if (this.formVideojuego.valid) {
            this.service.agregarJuegos(this.formVideojuego.value).subscribe(resp => {
                if (resp) {
                    this.formVideojuego.reset();
                }
            });
        } else {
            if (this.formVideojuego.touched) {
                Object.values(this.formVideojuego.controls).forEach(control => {
                    control.markAsTouched();
                });
            }
        }
    }
}
