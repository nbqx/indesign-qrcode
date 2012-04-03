%w(sprockets fileutils).each{|x| require x}

main_file = 'app.jsx'
out = 'QRise_standalone.jsx'
build_folder = './build'
files = ['app.jsx', 'QRise.jsx', 'qrcode.js']

dir = Dir.pwd

unless File.exists? build_folder
  FileUtils.mkdir_p build_folder
end

env = Sprockets::Environment.new dir
env.register_mime_type 'application/javascript', '.jsx'
env.append_path File.join(dir,"src")

manifest = Sprockets::Manifest.new env, build_folder
manifest.compile files

open(out, "w") do |f|
  f.puts "#target InDesign-7.0" ## change your CS version
  f.puts env[main_file]
end

FileUtils.rm_rf build_folder
