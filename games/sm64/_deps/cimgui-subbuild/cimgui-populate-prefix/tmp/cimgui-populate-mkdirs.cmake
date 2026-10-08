# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file LICENSE.rst or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION ${CMAKE_VERSION}) # this file comes with cmake

# If CMAKE_DISABLE_SOURCE_CHANGES is set to true and the source directory is an
# existing directory in our source tree, calling file(MAKE_DIRECTORY) on it
# would cause a fatal error, even though it would be a no-op.
if(NOT EXISTS "/home/maxwe/Ghostship/build-web/_deps/cimgui-src")
  file(MAKE_DIRECTORY "/home/maxwe/Ghostship/build-web/_deps/cimgui-src")
endif()
file(MAKE_DIRECTORY
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-build"
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix"
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/tmp"
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/src/cimgui-populate-stamp"
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/src"
  "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/src/cimgui-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/src/cimgui-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/maxwe/Ghostship/build-web/_deps/cimgui-subbuild/cimgui-populate-prefix/src/cimgui-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
