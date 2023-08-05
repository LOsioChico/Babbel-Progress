export const currentDateFormated = () => {
  // Obtener la fecha actual en milisegundos (marca de tiempo)
  const currentTime = Date.now()

  // Crear un objeto de fecha a partir de la marca de tiempo
  const dateObject = new Date(currentTime)

  // Crear un arreglo con los nombres de los meses en el orden deseado
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  // Obtener el día del mes y el mes en número (ten en cuenta que los meses en JavaScript van de 0 a 11)
  const dia = dateObject.getDate()
  const mesNumero = dateObject.getMonth()

  // Obtener el nombre del mes utilizando el arreglo de meses
  const mesNombre = meses[mesNumero]

  // Formatear la fecha en el formato deseado
  const fechaFormateada = `${dia} de ${mesNombre}`

  return fechaFormateada
}
