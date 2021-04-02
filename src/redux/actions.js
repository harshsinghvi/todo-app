export const incrementCount = count => {
    const num = count+1
    return {
    type: 'INCREMENT_COUNT',
    count: num
    }
  }
  
export const decrementCount = count => {
    const num = count - 1
    return {
      type: 'DECREMENT_COUNT',
      count: num
    }
  }

export const setTotal = total => {
      return {
          type: 'SET_TOTAL',
          total: total
      }
  }

export const setCount = count => {
    return {
        type: 'SET_COUNT',
        count: count
    }
}