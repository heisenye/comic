async function asy1(){
  console.log(1)
  const b = await asy2()
  console.log(b)
  console.log(2)
}

asy2 = async () => {
  const a5 = await setTimeout(() => {
    console.log(3)
    console.log(4)
  }, 0)
}

asy3 = async () => {
  Promise.resolve().then(() => {
    console.log(6)
  })
}

asy1()
console.log(7)
asy3()