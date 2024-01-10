var appointment = require("../models/Appointment")
var mongoose = require("mongoose")
var AppointmentFactory = require("../factories/AppointmentFactory")
var mailer = require("nodemailer")

var Appo = mongoose.model("Appointment", appointment)

class AppointmentService {

    async Create(name, email, description, cpf, date, time){
        var newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        })
        try{
            await newAppo.save();
            return true
        }catch(err){
            console.log(err)
            return false
        }        
    }

    async GetAll(showFinished){

        if(showFinished){
            return await Appo.find()
        }else{
            var appos = await Appo.find({'finished' : false})
            var appointments = []

            appos.forEach(appointment => {

                if(appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }

                
            })

            return appointments
        }
    }

    async GetById(id){
        try{
            var event = await Appo.findOne({'_id': id})
            return event
        }catch(err){
            console.log(err)
        }
    }

    async Finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, {finished : true})
            return true
        }catch(err){
            console.log(err)
            return false
        }
        
    }

    async Search(query) {
        try {
            var appos = await Appo.find().or([{name: query}, {cpf: query}, {email: query}])
            return appos
        }catch(err){
            console.log(err)
            return []
        }
        
    }

    async SendNotification(){
        var appos = await this.GetAll(false)

        var transporter = mailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "suaagenda0@gmail.com",
                pass: "jrkpxzesgilfirmd"
            },
            secureProtocol: 'TLSv1_method'
        })

        appos.forEach(async app => {

            var date = app.start.getTime()
            var hour = 1000 * 60 * 60 * 24
            var gap = date-Date.now()

            if(gap <= hour){
                if(!app.notified){

                    await Appo.findByIdAndUpdate(app.id, {notified: true})

                        transporter.sendMail({
                        from: "Sua Agenda <suaagenda0@gmail.com>",
                        to: app.email,
                        subject: "Seu agendamento está próximo!",
                        html: `Olá, <strong>${app.name}</strong>!<br><br>
                        Sua consulta: <strong>${app.description}</strong> com data para <strong>${app.start.getDate()}/${app.start.getMonth()+1}/${app.start.getFullYear()}</strong> às <strong>${app.time}</strong> está próxima!<br><br>
                        Estamos aqui para te lembrar!<br><br>
                        <em>Att.<br>
                        Sua Agenda</em><br><br>
                        <p style="font-size: 10px;">Atenção! E-mail automático. Não responda esse e-mail pois essa conta não é monitorada.</p>
                        `

                    }).then(() => {

                    }).catch(err => {
                        console.log(err)
                    })
                }
            }


        })
    }
}

module.exports = new AppointmentService()