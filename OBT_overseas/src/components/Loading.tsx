import React from 'react'
import loadingImg from '../assets/loading.gif'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`
const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 4px;
  width: 250px;
  text-align: center;
  font-size: 14px;
  min-height: 22px;
`

const Loading = () => {
  return (
    <div>
      <LoadingContainer>
        <LoadingBox>
          <img src={loadingImg} alt="loading" />
          Loading...
        </LoadingBox>
      </LoadingContainer>
    </div>
  )
}

export default Loading
