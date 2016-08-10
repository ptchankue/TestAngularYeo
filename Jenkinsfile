node {
  def nodeHome = tool name: 'node-0.12.2'

  stage 'Prepare'
  withEnv("node=$nodeHome") {
    sh "npm install --verbose"
    sh "bower install"
  }

  stage 'Build'

  sh "grunt build -f"

  stage 'Test'

  stage 'Deploy'

}
