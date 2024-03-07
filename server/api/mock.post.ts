export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as AuthData

  await new Promise((resolve) => setTimeout(() => resolve('Just timeout'), 1000))

  return {
    wow: `Hi!, ${body.username}`
  }
})
