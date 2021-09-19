build:
	rm -rf public/
	hugo --minify --source=exampleSite --themesDir=../..

preview:
	hugo server -p 1314 --source=exampleSite --themesDir=../.. --disableFastRender