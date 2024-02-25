/***
 Exit codes for the program. Follows the sysexits.h convention.
 @see #include <sysexits.h>
*/

export const enum ExitCodes {
  ExOk = 0,
  ExUsage = 64,
  ExDataErr = 65,
  ExNoInput = 66,
  ExNoUser = 67,
  ExNoHost = 68,
  ExUnavailable = 69,
  ExSoftware = 70,
  ExOsErr = 71,
  ExOsFile = 72,
  ExCantCreat = 73,
  ExIoErr = 74,
  ExTempFail = 75,
  ExProtocol = 76,
  ExNoPerm = 77,
  ExConfig = 78,
}
