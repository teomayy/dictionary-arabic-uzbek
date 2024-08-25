'use client'
import { PropsWithChildren } from 'react'

export default function layout({ children }: PropsWithChildren<unknown>) {
	return <div>{children}</div>
}
