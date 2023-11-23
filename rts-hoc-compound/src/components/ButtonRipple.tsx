import React from "react"
import { Card } from "antd"
import styled from "styled-components"

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;

  height: 50px;
  width: 100px;

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
    width: 50px; /* Initial width of the ripple */
    height: 50px; /* Initial height of the ripple */
    margin-top: -20px; /* Offset to center the ripple */
    margin-left: -20px; /* Offset to center the ripple */
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`

StyledButton.styledComponentId = "btn"

const ButtonRipple = () => {
  const ref = React.useRef<HTMLButtonElement>(null)

  console.log(StyledButton)

  const handleEffect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = ref.current
    if (!button) return

    const ripples = document.createElement("span")
    const { left, top } = button.getBoundingClientRect()

    const x = e.clientX - left
    const y = e.clientY - top

    ripples.style.left = x + "px"
    ripples.style.top = y + "px"
    ripples.className = "ripple"

    button.appendChild(ripples)

    setTimeout(() => {
      ripples.remove()
    }, 1000)
  }

  return (
    <Card>
      <StyledButton ref={ref} onClick={handleEffect}>
        Button
      </StyledButton>
    </Card>
  )
}

export default ButtonRipple
