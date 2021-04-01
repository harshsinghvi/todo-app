export const incrementCount = count => {
    const num = count+1
    console.log("increment redux "+num);
    return {
    type: 'INCREMENT_COUNT',
    count: num
    }
  }
  
export const decrementCount = count => {
    const num = count - 1
    console.log("decrement redux "+num)

    return {
      type: 'DECREMENT_COUNT',
      count: num
    }
  }

export const setTotal = total => {
      console.log("Redux total = " + total)
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