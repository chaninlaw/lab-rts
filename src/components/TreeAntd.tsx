import React, { useDeferredValue, useEffect, useState } from 'react'
import { Card, Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import { style } from '../constants/style'

// interface Request {
//   id: number
//   attach_file: number[]
//   initiator: number[]
//   inspector: number[]
//   assignee: number[][]
//   manager: number[]
// }

interface Reponse {
	id: number
	title: string
	count: number
	files: {
		id: number
		title: string
		type: string
		size: number
		role: {
			type: 'assignee' | 'manager' | 'document' | 'initiator' | 'inspector'
			order: number
		}[]
	}[]
}

const fakeResponse: Reponse[] = [
	{
		id: 1,
		title: 'Response 1',
		count: 2,
		files: [
			{
				id: 1,
				title: 'File 1',
				type: 'document',
				size: 100,
				role: [
					{ type: 'assignee', order: 1 },
					{ type: 'assignee', order: 2 },
				],
			},
			{
				id: 2,
				title: 'File 2',
				type: 'initiator',
				size: 50,
				role: [{ type: 'initiator', order: 1 }],
			},
		],
	},
	{
		id: 2,
		title: 'Response 2',
		count: 1,
		files: [
			{
				id: 3,
				title: 'File 3',
				type: 'manager',
				size: 75,
				role: [{ type: 'manager', order: 1 }],
			},
		],
	},
]

const TreeAntd: React.FC = () => {
	const [data, setData] = useState<DataNode[]>([])
	const [selected, setSelected] = useState<React.Key[]>([])
	const defferedSelected = useDeferredValue(selected)

	// Step 1: Transform the input data into the desired format
	function transformData(responseArray: Reponse[]): DataNode[] {
		const transformedData: DataNode[] = [
			{
				title: 'Select All',
				key: '0-0',
				children: responseArray.map((response) => {
					const childNodes: DataNode[] = response.files.map(
						(file, fileIndex) => ({
							title: file.title,
							key: `0-${response.id}-${fileIndex + 1}`,
							isLeaf: true,
						})
					)

					// Add 'Cover sheet' as the first child
					childNodes.unshift({
						title: 'Cover sheet',
						key: `0-${response.id}-0`,
						disabled: true,
						isLeaf: true,
					} as DataNode)

					return {
						title: response.title,
						key: `0-${response.id.toString()}`,
						children: childNodes,
					}
				}),
			},
		]

		return transformedData
	}

	// Step 2: Convert selected keys back to the original format
	// function convertKeysToOriginalFormat(
	//   keys: string[],
	//   data: Reponse[]
	// ): Request[] {
	//   const result: Request[] = data.map((response) => ({
	//     id: response.id,
	//     attach_file: [],
	//     initiator: [],
	//     inspector: [],
	//     assignee: Array.from({ length: response.files.length }, () => []),
	//     manager: [],
	//   }))

	//   keys.forEach((key) => {
	//     const [_, responseId, fileIndexStr] = key.split('-')
	//     // console.log('responseId', responseId)
	//     // console.log('fileIndexStr', fileIndexStr)
	//     const responseIndex = Number(responseId) - 1
	//     // console.log('responseIndex', responseIndex)
	//     const fileIndex = Number(fileIndexStr)
	//     // console.log('data', data)
	//     const file = data[responseIndex].files[fileIndex]

	//     if (file.type === 'document') {
	//       result[responseIndex].attach_file.push(file.id)
	//     } else if (file.type === 'initiator') {
	//       result[responseIndex].initiator.push(file.id)
	//     } else if (file.type === 'inspector') {
	//       result[responseIndex].inspector.push(file.id)
	//     } else if (file.type === 'assignee') {
	//       const order = file.role[0].order
	//       result[responseIndex].assignee[order - 1].push(file.id)
	//     } else if (file.type === 'manager') {
	//       result[responseIndex].manager.push(file.id)
	//     }
	//   })

	//   return result
	// }

	function filterCoverSheets(transformedData: DataNode[]): React.Key[] {
		return transformedData.flatMap((node) => {
			if (node.title === 'Cover sheet') {
				return [node.key]
			}
			if (node.children) {
				return filterCoverSheets(node.children)
			}
			return []
		})
	}

	function filterSelectableFiles(data: DataNode[]) {
		return data
			.flatMap((node) => node.children)
			.flatMap((node) => node?.children)
			.filter((fileNode) => fileNode?.isLeaf)
			.map((fileNode) => fileNode?.key)
	}

	useEffect(() => {
		setData(transformData(fakeResponse))
		// console.log(transformData(fakeResponse))
		// console.log(filterSelectableFiles(transformData(fakeResponse)))
		// console.log(filterCoverSheets(transformData(fakeResponse)))
	}, [])

	const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
		setSelected(checkedKeys as React.Key[])
		// const toPost = convertKeysToOriginalFormat(
		//   checkedKeys as string[],
		//   fakeResponse
		// )
		// console.log('toPost', toPost)
	}

	return (
		<Card bodyStyle={style}>
			{data.length !== 0 && (
				<>
					<Tree.DirectoryTree
						checkable
						defaultExpandAll
						defaultCheckedKeys={filterCoverSheets(transformData(fakeResponse))}
						onCheck={onCheck}
						treeData={data}
						selectable={false}
					/>
					<p>Total files: {filterSelectableFiles(data).length}</p>
					<p>Current select files: {defferedSelected.length}</p>
				</>
			)}
		</Card>
	)
}

export default TreeAntd
