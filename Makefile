################################################################################
#
# Virtual Host Framework
# Copyright (C) 2007-2008  Make A Byte, inc
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
################################################################################

################################################################################
# SETTINGS
################################################################################

#
# Path to the folder of your qooxdoo distribution.
# Can either be
# a) a relative path to the location of this Makefile (preferred) or
# b) an absolute path starting at the root of your file system
# Example: If you put the skeleton folder next to the qooxdoo SDK folder,
# you can use the following relative path:
# QOOXDOO_PATH = ../../qooxdoo-0.7-sdk
# Please note that Windows users should always use relative paths.
# It should end with the last directory. Please omit a trailing slash.
#
QOOXDOO_PATH = ../qooxdoo-0.7.2-sdk
QOOXDOO_URI = ../../qooxdoo-0.7.2-sdk

#
# Namespace of your application e.g. custom
# Even complexer stuff is possible like: net.sf.custom
#
APPLICATION_NAMESPACE = vhf

#
# Files that will be copied from the source directory into the build
# directory (space separated list). The default list is empty.
#
APPLICATION_FILES = index.html

#-------------------------------------------------------------------------------
# For a full list and description of available application settings, please 
# see the APPLICATION variables in file 
# $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# Add any of those variables for your custom configuration here:
#-------------------------------------------------------------------------------
APPLICATION_CLASSNAME = Index


# TO SPEED UP DEBUG BUILDS
APPLICATION_OPTIMIZE_STRINGS = false
APPLICATION_OPTIMIZE_VARIABLES = false
APPLICATION_OPTIMIZE_BASE_CALL = false
APPLICATION_OPTIMIZE_REMOVE_DEBUG = false
APPLICATION_COMPLETE_SOURCE = true

# After debugging
# APPLICATION_BUILD_LOG_LEVEL = off


################################################################################
# INTERNALS (PLEASE DO NOT CHANGE)
################################################################################

ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
endif

error:
	@echo "  * Please configure QOOXDOO_PATH"
