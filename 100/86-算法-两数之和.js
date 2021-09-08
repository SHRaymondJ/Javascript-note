// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数
// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用

const twoNum = (nums, target) => {
    const maps = { };
    for (let i = 0, len = nums.length; i < len; i++) {
        let diff = target - nums[i];
        if (maps[diff] > -1) {
            return [maps[diff], i];
        }
        maps[nums[i]] = i;
    }
    return [];
}