import { reactive } from 'vue'

export function useStyledScrollArea () {
  const thumbStylePerso = reactive({
    right: '3.5px',
    borderRadius: '5px',
    backgroundColor: '#7BB542',
    width: '12px',
    opacity: '0.75'
  })

  const barStyle = reactive({
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#7BB542',
    width: '15px'
  })
  return {
    thumbStylePerso,
    barStyle
  }
}
