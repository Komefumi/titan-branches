import React, { FC } from "react"
import { Routes, Route } from "react-router-dom"

import { pathToRouteMap } from "./routingConfig"

const IndexApp = () => {
  return (
    <div>
      <Routes>
        {[...pathToRouteMap.keys()].map((path) => {
          const Component = pathToRouteMap.get(path) as FC
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
    </div>
  )
}

export default IndexApp
