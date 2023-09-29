function hello (name: string): void {
// La fonction ne retournant rien, elle aura le type void
// Elle prend en paramètre un nom qui sera de type string
  console.log('Hello ' + name)
}

const firstName: string = 'bob'
// Logiquement, il n'est pas ici nécessaire de typer la variable firstname, car les gillemets donnent implicitement le type string

hello(firstName)
hello(firstName + ' marley')

function concat (a: string, b: string): string {
// La fonction ici prend deux parametre a et b qui seront des string. Elle retournera donc un string.
  return a + b
}

const wcs: string = concat('Wild', concat('Code', 'School'))
console.log(wcs)
