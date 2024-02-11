function twoSum(nums: number[], target: number) {
	let temp = new Map()
  for (let num of nums) {
    if (temp.has(target - num)) {
      return [temp.get(target - num), nums.indexOf(num)]
    }
    temp.set(num, nums.indexOf(num))
  }
  return [-1, -1]
}

const nums = [6, 1, 5, 16, 3, 2, 9, 4, 7]
const target = 9

console.log(twoSum(nums, target))