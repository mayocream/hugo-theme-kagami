build:
	rm -rf public/
	hugo --minify

preview:
	hugo server -p 1314 --source=exampleSite --themesDir=../.. --disableFastRender