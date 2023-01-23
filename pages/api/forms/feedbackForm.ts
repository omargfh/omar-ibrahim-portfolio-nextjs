// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  age: number,
  affiliation: string,
  major: string[],
  message: string
}

function age(): number {
  const [yr, m, day]: number[] = new Date().toISOString().split('T')[0].split('-').map(e => parseInt(e))
  const [birthYear, birthMonth, birthDay]: number[] = [2003, 26, 8]
  let age: number = yr - birthYear
  if (m < birthMonth || (m == birthMonth && day < birthDay))
    age--
  return age
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: 'Omar Ibrahim',
    age: age(),
    affiliation: 'University of Chicago',
    major: ['Computer Science', 'Economics'],
    message: 'Hello, World!'
  })
}
