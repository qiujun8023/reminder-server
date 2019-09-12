export class UserService {
  //   public create(array $data) {
  //     return
  //       return $this - > httpPostJson('cgi-bin/user/create', $data);
  //   }
  //   public update(string $id, array $data) {
  //       return $this - > httpPostJson('cgi-bin/user/update', array_merge(['userid' => $id], $data));
  //   }
  //   public delete($userId) {
  //       if (is_array($userId)) {
  //           return $this - > batchDelete($userId);
  //       }
  //       return $this - > httpGet('cgi-bin/user/delete', ['userid' => $userId]);
  //   }
  //   public batchDelete(array $userIds) {
  //       return $this - > httpPostJson('cgi-bin/user/batchdelete', ['useridlist' => $userIds]);
  //   }
  //   public get(string $userId) {
  //       return $this - > httpGet('cgi-bin/user/get', ['userid' => $userId]);
  //   }
  //   public getDepartmentUsers(int $departmentId, bool $fetchChild = false) {
  //       $params = [
  //           'department_id' => $departmentId,
  //           'fetch_child' => (int) $fetchChild,
  //       ];
  //       return $this - > httpGet('cgi-bin/user/simplelist', $params);
  //   }
  //   public */;
  //  public getDetailedDepartmentUsers(int $departmentId, bool $fetchChild = false);
  // {
  //      $params = [
  //          'department_id' => $departmentId,
  //          'fetch_child' => (int) $fetchChild,
  //      ];
  //      return $this - > httpGet('cgi-bin/user/list', $params);
  //  }
  //  /**
  //   * Convert userId to openid.
  //   *
  //   * @param string   $userId
  //   * @param int|null $agentId
  //   *
  //   * @return \Psr\Http\Message\ResponseInterface|\EasyWeChat\Kernel\Support\Collection|array|object|string
  //   *
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   * @throws \GuzzleHttp\Exception\GuzzleException
  //   */
  //  public userIdToOpenid(string $userId, int $agentId = null);
  // {
  //      $params = [
  //          'userid' => $userId,
  //          'agentid' => $agentId,
  //      ];
  //      return $this - > httpPostJson('cgi-bin/user/convert_to_openid', $params);
  //  }
  //  /**
  //   * Convert openid to userId.
  //   *
  //   * @param string $openid
  //   *
  //   * @return \Psr\Http\Message\ResponseInterface|\EasyWeChat\Kernel\Support\Collection|array|object|string
  //   *
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   * @throws \GuzzleHttp\Exception\GuzzleException
  //   */
  //  public openidToUserId(string $openid);
  // {
  //      $params = [
  //          'openid' => $openid,
  //      ];
  //      return $this - > httpPostJson('cgi-bin/user/convert_to_userid', $params);
  //  }
  //  /**
  //   * Convert mobile to userId.
  //   *
  //   * @param string $mobile
  //   *
  //   * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
  //   *
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   * @throws \GuzzleHttp\Exception\GuzzleException
  //   */
  //  public mobileToUserId(string $mobile);
  // {
  //      $params = [
  //          'mobile' => $mobile,
  //      ];
  //      return $this - > httpPostJson('cgi-bin/user/getuserid', $params);
  //  }
  //  /**
  //   * @param string $userId
  //   *
  //   * @return \Psr\Http\Message\ResponseInterface|\EasyWeChat\Kernel\Support\Collection|array|object|string
  //   *
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   */
  //  public accept(string $userId);
  // {
  //      $params = [
  //          'userid' => $userId,
  //      ];
  //      return $this - > httpGet('cgi-bin/user/authsucc', $params);
  //  }
  //  /**
  //   * Batch invite users.
  //   *
  //   * @param array $params
  //   *
  //   * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
  //   *
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   * @throws \GuzzleHttp\Exception\GuzzleException
  //   */
  //  public invite(array $params);
  // {
  //      return $this - > httpPostJson('cgi-bin/batch/invite', $params);
  //  }
  //  /**
  //   * Get invitation QR code.
  //   *
  //   * @param int $sizeType
  //   *
  //   * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
  //   *
  //   * @throws InvalidArgumentException
  //   * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
  //   */
  //  public getInvitationQrCode(int $sizeType = 1);
  // {
  //      if (! {; }; } { } {\in_array($sizeType, [1, 2, 3, 4], true); ) {
  //          throw new InvalidArgumentException('The sizeType must be 1, 2, 3, 4.');
  //      }
  //                     return $this - > httpGet('cgi-bin/corp/get_join_qrcode', ['size_type' => $sizeType]);
  //  }
}
